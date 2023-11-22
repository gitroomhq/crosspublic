import { Reflector } from '@nestjs/core';

export const Revalidate = Reflector.createDecorator({
  transform: () => {
    return true;
  }
});
