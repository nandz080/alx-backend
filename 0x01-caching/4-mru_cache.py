#!/usr/bin/env python3
"""MRUCache module"""

from base_caching import BaseCaching

class MRUCache(BaseCaching):
    """MRUCache class
    Inherits from BaseCaching and implements a caching system
    using the MRU algorithm.
    """

    def __init__(self):
        """Initialize the MRU cache."""
        super().__init__()

    def put(self, key, item):
        """Add an item in the cache.
        If key or item is None, this method should not do anything.
        If the number of items in self.cache_data is higher than BaseCaching.MAX_ITEMS:
            - Discard the most recently used item (MRU algorithm).
            - Print DISCARD: with the key discarded and followed by a new line.
        """
        if key is not None and item is not None:
            # If key already exists, move it to the end of cache_keys
            if key in self.cache_data:
                del self.cache_data[key]
            # If cache is full, remove the most recently used item
            elif len(self.cache_data) >= self.MAX_ITEMS:
                mru_key = next(reversed(self.cache_data))
                print("DISCARD:", mru_key)
                del self.cache_data[mru_key]
            # Update cache_data with the new item
            self.cache_data[key] = item

    def get(self, key):
        """Get an item by key.
        If key is None or if the key doesn’t exist in self.cache_data, return None.
        """
        if key is None or key not in self.cache_data:
            return None
        # Move the key to the end of cache_data to mark it as most recently used
        item = self.cache_data.pop(key)
        self.cache_data[key] = item
        return item
