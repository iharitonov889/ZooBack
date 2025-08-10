import { createClient } from "redis";

const client = createClient({
  username: process.env.API_REDIS_USERNAME,
  password: process.env.API_REDIS_PASSWORD,
  socket: {
    host: process.env.API_REDIS_SOCKET_HOST,
    port: process.env.API_REDIS_SOCKET_PORT,
  },
});

client.connect();
client.on("connect", () => console.log("Redis: Connection successful"));
client.on("error", (err) => console.log("Redis Client Error", err));

const storeOtp = async (email, otp) => {
  const id = Math.floor(100000 + Math.random() * 900000).toString();
  const k = `id:${id}`;
  const v = `email:${email}, otp:${otp}`;
  await client.set(k, v, { EX: 60 * 10 });
};

const parserForEmail = async (opt) => {
  const keys = await client.keys("id:*");
  for (const key of keys) {
    const value = await client.get(key);
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
  await client.del(k);
};

export { storeOtp, parserForEmail, delRedis };
