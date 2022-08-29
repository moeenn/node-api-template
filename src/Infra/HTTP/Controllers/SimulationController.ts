import { Context } from "@/Infra/HTTP/Server"
import { validate } from "@/Application/Helpers"
import { SimulationService } from "@/Domain/ModelServices"

/**
 *  list out all registered simulations
 * 
*/
async function ListAll(ctx: Context) {
  ctx.body = await SimulationService.listAllSimulations()
}

/**
 *  get a specific simulation
 * 
*/
async function GetOne(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|required",
  })

  const simulation = await SimulationService.getSimulationByID(params.id)
  ctx.body = simulation.toObject()
}

/**
 *  create a new simulation
 * 
*/
async function Create(ctx: Context) {
  const body = validate(ctx.request.body, {
    name: "string|required",
    library: {
      interactive: "required",
      model: "required",
    }
  })

  const simulation = await SimulationService.createSimulation(body)
  ctx.status = 201
  ctx.body = simulation.toObject()
}

/**
 *  update an existing simulation
 * 
*/
async function Update(ctx: Context) {
  const body = validate(ctx.request.body, {
    name: "string|required",
    library: {
      interactive: "required",
      model: "required",
    }
  })

  const params = validate(ctx.params, {
    id: "objectid|required",
  })

  let simulation = await SimulationService.getSimulationByID(params.id)    
  simulation = await SimulationService.updateSimulation(simulation, body)

  ctx.body = simulation.toObject()
}

/**
 *  delete an existing simulation
 * 
*/
async function Delete(ctx: Context) {
  const params = validate(ctx.params, {
    id: "objectid|required",
  })

  await SimulationService.deleteSimulation(params.id)
  ctx.body = { 
    message: "resource deleted successfully" 
  }
}

export default {
  ListAll,
  GetOne,
  Create,
  Update,
  Delete,
}