/**
 * Masjid v2 - Auth.gs
 * JWT Authentication System
 */

// ==================== JWT IMPLEMENTATION ====================

function base64UrlEncode_(str) {
  return Utilities.base64EncodeWebSafe(str).replace(/=+$/, '');
}

function base64UrlEncodeBytes_(bytes) {
  return Utilities.base64EncodeWebSafe(bytes).replace(/=+$/, '');
}

function base64UrlDecode_(str) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return Utilities.newBlob(Utilities.base64Decode(s)).getDataAsString();
}

function createJWT_(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + APP_CONFIG.JWT_EXPIRY
  };
  
  const headerB64 = base64UrlEncode_(JSON.stringify(header));
  const payloadB64 = base64UrlEncode_(JSON.stringify(fullPayload));
  const sigInput = headerB64 + '.' + payloadB64;
  
  const sigBytes = Utilities.computeHmacSha256Signature(sigInput, APP_CONFIG.JWT_SECRET);
  const sigB64 = base64UrlEncodeBytes_(sigBytes);
  
  return sigInput + '.' + sigB64;
}

function verifyJWT_(token) {
  try {
    if (!token) return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Verify signature
    const sigInput = parts[0] + '.' + parts[1];
    const expectedSig = base64UrlEncodeBytes_(
      Utilities.computeHmacSha256Signature(sigInput, APP_CONFIG.JWT_SECRET)
    );
    
    if (expectedSig !== parts[2]) return null;
    
    // Decode payload
    const payload = JSON.parse(base64UrlDecode_(parts[1]));
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;
    
    // Check blacklist
    const cache = CacheService.getScriptCache();
    if (cache.get('blacklist_' + token)) return null;
    
    return payload;
  } catch (e) {
    return null;
  }
}

// ==================== AUTH FUNCTIONS ====================

function authenticateUser(username, password) {
  const config = getConfig();
  
  if (!config.SHEET_BERITA_ID) {
    // Fallback: belum setup, gunakan default
    if (username === 'masjid' && password === 'indonesia') {
      return {
        id: 'admin-default',
        username: 'masjid',
        nama: 'Admin Masjid',
        role: 'admin'
      };
    }
    return null;
  }
  
  try {
    const ss = SpreadsheetApp.openById(config.SHEET_BERITA_ID);
    const sheet = ss.getSheetByName('Users');
    if (!sheet) return null;
    
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === username && data[i][2] === password && data[i][5] === 'active') {
        return {
          id: data[i][0],
          username: data[i][1],
          nama: data[i][3],
          role: data[i][4] || 'admin'
        };
      }
    }
  } catch (e) {
    Logger.log('Auth error: ' + e.message);
  }
  
  return null;
}

function requireAuth_(token) {
  const payload = verifyJWT_(token);
  if (!payload) {
    throw new Error('UNAUTHORIZED');
  }
  return payload;
}
