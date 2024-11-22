import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
      protocol:'https',
      hostname:'fakestoreapi.com'
    },
    {
      protocol:'https',
      hostname:'images-eu.ssl-images-amazon.com'
    },
    ]
  }
};

export default nextConfig;
