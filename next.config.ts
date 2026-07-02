import { withPayload } from '@payloadcms/next/withPayload'

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: true,
    images: {
        dangerouslyAllowSVG: false,
        remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }] ,
    },
};

export default withPayload(nextConfig)
