#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const certsDir = path.join(process.cwd(), 'certs');
const keyPath = path.join(certsDir, 'localhost-key.pem');
const certPath = path.join(certsDir, 'localhost.pem');

// Create certs directory if it doesn't exist
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}

// Check if certificates already exist
if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  console.log('✅ SSL certificates already exist at:', certsDir);
  console.log('   To regenerate, delete the certs directory first.\n');
  process.exit(0);
}

console.log('🔐 Generating SSL certificates for localhost...\n');

try {
  // Check if mkcert is installed
  try {
    execSync('which mkcert', { stdio: 'ignore' });
    console.log('Using mkcert to generate certificates...\n');
    
    // Generate certificates using mkcert
    execSync(
      `mkcert -install && mkcert -key-file ${keyPath} -cert-file ${certPath} localhost 127.0.0.1 ::1`,
      { stdio: 'inherit' }
    );
    
    console.log('\n✅ SSL certificates generated successfully!');
    console.log('   Key:', keyPath);
    console.log('   Cert:', certPath);
    console.log('\n   You can now run: yarn dev:https\n');
  } catch (mkcertError) {
    // Fallback to openssl if mkcert is not available
    console.log('mkcert not found. Using OpenSSL instead...\n');
    console.log('Note: OpenSSL certificates will show a security warning in browsers.');
    console.log('For trusted certificates, install mkcert: brew install mkcert\n');
    
    // Generate self-signed certificate using openssl
    const opensslCommand = `openssl req -x509 -newkey rsa:4096 -keyout ${keyPath} -out ${certPath} -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`;
    
    execSync(opensslCommand, { stdio: 'inherit' });
    
    console.log('\n✅ SSL certificates generated successfully!');
    console.log('   Key:', keyPath);
    console.log('   Cert:', certPath);
    console.log('\n   ⚠️  These are self-signed certificates.');
    console.log('   Your browser will show a security warning.');
    console.log('   Click "Advanced" and "Proceed to localhost" to continue.\n');
    console.log('   You can now run: yarn dev:https\n');
  }
} catch (error) {
  console.error('\n❌ Error generating certificates:', error.message);
  console.error('\nPlease ensure you have either:');
  console.error('  1. mkcert installed (recommended): brew install mkcert');
  console.error('  2. OpenSSL installed (fallback)\n');
  process.exit(1);
}

