import { useSyncExternalStore } from "react";
import * as SecureStore from "expo-secure-store";
import {
  DEFAULT_ENTER_TO_SEND,
  DEFAULT_WEB_SEARCH_ENABLED,
  ENTER_TO_SEND_STORAGE_KEY,
  WEB_SEARCH_ENABLED_STORAGE_KEY,
} from "@overtchat/shared";

const KEY = WEB_SEARCH_ENABLED_STORAGE_KEY;

function read(): boolean {
  const v = SecureStore.getItem(KEY);
  if (v === "1") return true;
  if (v === "0") return false;
  return DEFAULT_WEB_SEARCH_ENABLED;
}

const listeners = new Set<() => void>();
let cached: boolean = read();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return cached;
}

export function useWebSearchEnabled(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function setWebSearchEnabled(enabled: boolean) {
  if (enabled === cached) return;
  cached = enabled;
  // The default needs no stored value — a fresh/cleared device resolves to it.
  if (enabled === DEFAULT_WEB_SEARCH_ENABLED) {
    SecureStore.deleteItemAsync(KEY).catch(() => {});
  } else {
    SecureStore.setItem(KEY, enabled ? "1" : "0");
  }
  listeners.forEach((cb) => cb());
}

export function getWebSearchEnabled(): boolean {
  return cached;
}

const ENTER_TO_SEND_KEY = ENTER_TO_SEND_STORAGE_KEY;

function readEnterToSend(): boolean {
  const v = SecureStore.getItem(ENTER_TO_SEND_KEY);
  if (v === "1") return true;
  if (v === "0") return false;
  return DEFAULT_ENTER_TO_SEND;
}

const enterToSendListeners = new Set<() => void>();
let enterToSendCached: boolean = readEnterToSend();

function subscribeEnterToSend(cb: () => void) {
  enterToSendListeners.add(cb);
  return () => enterToSendListeners.delete(cb);
}

function getEnterToSendSnapshot() {
  return enterToSendCached;
}

export function useEnterToSend(): boolean {
  return useSyncExternalStore(
    subscribeEnterToSend,
    getEnterToSendSnapshot,
    getEnterToSendSnapshot,
  );
}

export function setEnterToSend(enabled: boolean) {
  if (enabled === enterToSendCached) return;
  enterToSendCached = enabled;
  if (enabled === DEFAULT_ENTER_TO_SEND) {
    SecureStore.deleteItemAsync(ENTER_TO_SEND_KEY).catch(() => {});
  } else {
    SecureStore.setItem(ENTER_TO_SEND_KEY, enabled ? "1" : "0");
  }
  enterToSendListeners.forEach((cb) => cb());
}

export function getEnterToSend(): boolean {
  return enterToSendCached;
}
