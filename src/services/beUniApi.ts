import axios from "axios";

export const beUniApiKey: string =
  "7aa665d9ef16277a74a80e48020d51ea16de68cdf61a191517eaf4deae28da47c5cf4672e58211d567c6fc6c5d34bdde903bcd0e898572f57bf229701ee5799ed633ba3c4aac727c355f77a2a8223d5e54ecb6a4f1f66c8b9db16faa3050c11b4bf81475148e6d6d79edb7a850c6c99b371e3b4f6d7893785e6b262ade9f094f";

export const beUniApi = axios.create({
  baseURL: "https://optimistic-diamond-bbae9b0ff4.strapiapp.com/api",
});
