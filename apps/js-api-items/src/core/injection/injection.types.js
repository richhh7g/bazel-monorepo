import { ProductController, RootController } from "../../api/controller";
import { ProductRepository } from "../../api/repository";
import {
  CreateProductService,
  DeleteProductService,
  UpdateProductService,
} from "../../api/service";

export const TYPES = {
  controller: {
    RootController: Symbol.for(RootController.name),
    ProductController: Symbol.for(ProductController.name),
  },
  service: {
    CreateProductService: Symbol.for(CreateProductService.name),
    UpdateProductService: Symbol.for(UpdateProductService.name),
    DeleteProductService: Symbol.for(DeleteProductService.name),
  },
  repository: {
    ProductRepository: Symbol.for(ProductRepository.name),
  },
};
