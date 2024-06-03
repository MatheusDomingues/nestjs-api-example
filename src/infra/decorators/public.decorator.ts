import { SetMetadata } from '@nestjs/common';

import { ROUTE_PUBLIC_KEY } from '@/shared/utils/constants';

export const IsPublic = () => SetMetadata(ROUTE_PUBLIC_KEY, true);
