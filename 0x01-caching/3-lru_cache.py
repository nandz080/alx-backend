#!/usr/bin/env python3
"""Module that Create a class LRUCache that inherits from BaseCaching and is a caching system"""

from base_caching import BaseCaching

class LRUCache(BaseCaching):
    """LRUCache class
    Inherits from BaseCaching and implements a caching system
    using the LRU algorithm.
    """

    def __init__(self):
        """Initialize the LRU cache."""
        super().__init__()
        self.cache_keys = []  # List to store keys in order of access

    def put(self, key, item):
        """Add an item in the cache.
        If key or item is None, this method should not do anything.
        If the number of items in self.cache_data is higher than BaseCaching.MAX_ITEMS:
            - Discard the least recently used item (LRU algorithm).
            - Print DISCARD: with the key discarded and followed by a new line.
        """
        if key is not None and item is not None:
            # If key already exists, remove it from cache_keys
            if key in self.cache_data:
                self.cache_keys.remove(key)
            # Add key to the end of cache_keys (most recently used)
            self.cache_keys.append(key)
            # If cache is full, remove the least recently used item
            if len(self.cache_keys) > self.MAX_ITEMS:
                lru_key = self.cache_keys.pop(0)  # Remove least recently used key
                print("DISCARD:", lru_key)
                del self.cache_data[lru_key]
            # Update cache_data with the new item
            self.cache_data[key] = item

    def get(self, key):
        """Get an item by key.
        If key is None or if the key doesn’t exist in self.cache_data, return None.
        Otherwise, move the key to the end of cache_keys (most recently used).
        """
        if key is None or key not in self.cache_data:
            return None
        # Move key to the end of cache_keys (most recently used)
        self.cache_keys.remove(key)
        self.cache_keys.append(key)
        return self.cache_data[key]
