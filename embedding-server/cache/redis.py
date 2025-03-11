import json
import redis
import heapq


class RedisCache:
    def __init__(self):
        self.client = redis.Redis(host="localhost", port=6379, db=0)

    def get(self, key):
        value = self.client.get(key)
        return json.loads(value) if value else None

    def set(self, key, data):
        try:
            key = f"image:{key}"
            self.client.set(
                key,
                json.dumps(
                    {
                        f"image:{image_id}": distance
                        for image_id, distance, vector, type in data
                    }
                ),
            )

        except Exception as e:
            print(e)
