import { ProductController, RootController } from "../../api/controller";
import { ProductRepository } from "../../api/repository";
import { CreateProductService } from "../../api/service";

export const TYPES = {
  controller: {
    RootController: Symbol.for(RootController.name),
    ProductController: Symbol.for(ProductController.name),
  },
  service: {
    CreateProductService: Symbol.for(CreateProductService.name),
  },
  repository: {
    ProductRepository: Symbol.for(ProductRepository.name),
  },
};
