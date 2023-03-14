import { RouteOptions } from "@/core/server"
import { UserRoutes } from "@/app/domain/user/User.routes"
import { HealthCheckRoutes } from "@/app/domain/healthCheck"
import { AuthRoutes } from "@/app/domain/auth"
import { ForgotPasswordRoutes } from "@/app/domain/forgotPassword"
import { SiteRoutes } from "@/app/domain/site"
import { SiteOptionsRoutes } from "@/app/domain/siteOptions"
import { SiteGateRoutes } from "@/app/domain/siteGate"
import { PackageManagerRoutes } from "@/app/domain/packageManager"
import { HoistRoutes } from "@/app/domain/hoist"
import { OffloadingBayRoutes } from "@/app/domain/offloadingBay"
import { ElevatorRoutes } from "@/app/domain/elevator"
import { LaydownAreaRoutes } from "@/app/domain/laydownArea"
import { ForkliftRoutes } from "@/app/domain/forklift"
import { UnloadMethodRoutes } from "@/app/domain/unloadMethod"
import { ConcreteRoutes } from "@/app/domain/concrete"
import { MeetingRoomRoutes } from "@/app/domain/meetingRoom"
import { EdgeProtectionRoutes } from "@/app/domain/edgeProtection"
import { FinalDestinationRoutes } from "@/app/domain/finalDestination"
import { MaterialOfNotesRoutes } from "@/app/domain/materialOfNotes"
import { MapRoutes } from "@/app/domain/map"

/**
 * register all routes here
 *
 */
export const routes: RouteOptions[] = [
  ...HealthCheckRoutes,
  ...AuthRoutes,
  ...ForgotPasswordRoutes,
  ...UserRoutes,
  ...SiteRoutes,
  ...SiteOptionsRoutes,
  ...SiteGateRoutes,
  ...PackageManagerRoutes,
  ...HoistRoutes,
  ...OffloadingBayRoutes,
  ...ElevatorRoutes,
  ...LaydownAreaRoutes,
  ...ForkliftRoutes,
  ...UnloadMethodRoutes,
  ...ConcreteRoutes,
  ...MeetingRoomRoutes,
  ...EdgeProtectionRoutes,
  ...FinalDestinationRoutes,
  ...MaterialOfNotesRoutes,
  ...MapRoutes,
]
