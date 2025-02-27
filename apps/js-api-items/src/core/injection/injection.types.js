import { ProductController, RootController } from "../../api/controller";
import { ProductRepository } from "../../api/repository";
import { CreateProductService, UpdateProductService } from "../../api/service";

export const TYPES = {
  controller: {
    RootController: Symbol.for(RootController.name),
    ProductController: Symbol.for(ProductController.name),
  },
  service: {
    CreateProductService: Symbol.for(CreateProductService.name),
    UpdateProductService: Symbol.for(UpdateProductService.name),
  },
  repository: {
    ProductRepository: Symbol.for(ProductRepository.name),
  },
};
