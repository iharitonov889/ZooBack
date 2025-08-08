import redis from "redis";

const redisClient = redis.createClient({
  host: process.env.API_REDIS_HOST,
  port: process.env.API_REDIS_PORT,
});
redisClient.on("connect", () => console.log("Redis: Connection successful"));
redisClient.on("error", () => console.log("Redis: An error occurred"));
redisClient.connect();

const storeOtp = async (email, otp) => {
  const id = Math.floor(100000 + Math.random() * 900000).toString();
  const k = `id:${id}`;
  const v = `email:${email}, otp:${otp}`;
  await redisClient.set(k, v, { EX: 60 * 10 });
};

const parserForEmail = async (opt) => {
  const keys = await redisClient.keys("id:*");
  for (const key of keys) {
    const value = await redisClient.get(key);
    if (value) {
      try {
        const parts = value.split(", ");
        const emailPart = parts.find((part) => part.startsWith("email:"));
        const otpPart = parts.find((part) => part.startsWith("otp:"));

        if (emailPart && otpPart) {
          const redisEmail = emailPart.substring("email:".length);
          const redisOtp = otpPart.substring("otp:".length);

          if (redisOtp === opt) {
            return redisEmail;
          }
        }
      } catch (error) {
        console.error("Redis parsing error:", error);
      }
    }
  }

  return null;
};

const delRedis = async (id) => {
  const k = `id:${id}`;
  await redisClient.del(k);
};

export { storeOtp, parserForEmail, delRedis };
