#!/usr/bin/env python3
"""Module Create a class FIFOCache that inherits from BaseCaching and is a caching system"""

from base_caching import BaseCaching

class FIFOCache(BaseCaching):
    """FIFOCache class
    Inherits from BaseCaching and implements a caching system
    using the FIFO algorithm.
    """

    def __init__(self):
        """Initialize the FIFO cache."""
        super().__init__()

    def put(self, key, item):
        """Add an item in the cache.
        If key or item is None, this method should not do anything.
        If the number of items in self.cache_data is higher than BaseCaching.MAX_ITEMS:
            - Discard the first item put in the cache (FIFO algorithm).
            - Print DISCARD: with the key discarded and followed by a new line.
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= self.MAX_ITEMS:
                # Find the first item added to the cache
                first_key = next(iter(self.cache_data))
                print("DISCARD:", first_key)
                del self.cache_data[first_key]
            self.cache_data[key] = item

    def get(self, key):
        """Get an item by key.
        If key is None or if the key doesn’t exist in self.cache_data, return None.
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
