import { query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("banners")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});
