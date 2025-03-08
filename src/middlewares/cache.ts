import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

const expiry = 60; // 1 minute

export const cacheMiddleware = (keyPrefix: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const key = `${keyPrefix}:${req.originalUrl}`;

    try {
      const cachedData = await redis.get(key);
      if (cachedData) {
        console.log(`Cache hit for ${key}`);
        res.json(JSON.parse(cachedData)); // Return cached response directly
        return; // Ensure the function returns void
      }

      console.log(`Cache miss for ${key}`);

      // Override res.json to store the response in Redis
      const originalJson = res.json.bind(res);
      res.json = (data: any) => {
        redis.set(key, JSON.stringify(data), 'EX', expiry).catch((error) => {
          console.error('Redis Cache Set Error:', error);
        });
        return originalJson(data);
      };

      next(); // Continue to the next middleware (route handler)
    } catch (error) {
      console.error('Redis Cache Error:', error);
      next(); // Continue to the next middleware or route handler if an error occurs
    }
  };
};

export const invalidateCache = async (key: string) => {
  try {
    await redis.del(key); // Delete the cached key
    console.log(`Cache invalidated for key: ${key}`);
  } catch (error) {
    console.error(`Error invalidating cache for key: ${key}`, error);
  }
};
