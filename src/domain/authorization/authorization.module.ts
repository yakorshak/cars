import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { RolesGuard } from './roles.guard';

@Module({
  providers: [AuthorizationService, RolesGuard],
  exports: [RolesGuard],
})
export class AuthorizationModule {}
