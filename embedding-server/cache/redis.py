import redis


class RedisCache:
    def __init__(self):
        self.client = redis.Redis(host="localhost", port=6379, db=0)

    def get(key):
        return None

    def set(key, data):
        return None
