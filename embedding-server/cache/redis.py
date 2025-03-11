import json
import redis


class RedisCache:
    def __init__(self):
        self.client = redis.Redis(host="localhost", port=6379, db=0)

    def get(self, key):
        value = self.client.get(f"image:{key}")
        return json.loads(value) if value else None

    def set(self, key, data):
        try:
            key = f"image:{key}"
            return self.client.set(key, json.dumps(data))
        except Exception as e:
            print(e)
