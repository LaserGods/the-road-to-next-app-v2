import { DynamicBuffer } from "@oslojs/binary";
import { decodeBase64 } from "@oslojs/encoding";
import { createCipheriv, createDecipheriv } from "crypto";

const key = decodeBase64(process.env.ECRYPTION_KEY ?? "");

export const encrypt = (data: Uint8Array): Uint8Array => {
  const iv = new Uint8Array(16);
  crypto.getRandomValues(iv);
  const cipher = createCipheriv("aes-128-gcm", key, iv);
  const encrypted = new DynamicBuffer(0);
  encrypted.write(iv);
  encrypted.write(cipher.update(data));
  encrypted.write(cipher.final());
  encrypted.write(cipher.getAuthTag());
  return encrypted.bytes();
};

export const encryptString = (data: string): Uint8Array => {
  return encrypt(new TextEncoder().encode(data));
};

export const decrypt = (data: Uint8Array): Uint8Array => {
  if (data.byteLength < 33) {
    throw new Error("Invalid data");
  }

  const decipher = createDecipheriv("aes-128-gcm", key, data.slice(0, 16));
  decipher.setAuthTag(data.slice(data.byteLength - 16));
  const decrypted = new DynamicBuffer(0);
  decrypted.write(decipher.update(data.slice(16, data.byteLength - 16)));
  decrypted.write(decipher.final());
  return decrypted.bytes();
};

export const decryptString = (data: Uint8Array): string => {
  return new TextDecoder().decode(decrypt(data));
};
