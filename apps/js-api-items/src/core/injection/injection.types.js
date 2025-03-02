import { ProductController, RootController } from "../../api/controller";
import { ProductRepository } from "../../api/repository";
import {
  CreateProductService,
  DeleteProductService,
  GetProductService,
  ListProductsService,
  UpdateProductService,
} from "../../api/service";

export const TYPES = {
  controller: {
    RootController: Symbol.for(RootController.name),
    ProductController: Symbol.for(ProductController.name),
  },
  service: {
    ListProductsService: Symbol.for(ListProductsService.name),
    GetProductService: Symbol.for(GetProductService.name),
    CreateProductService: Symbol.for(CreateProductService.name),
    UpdateProductService: Symbol.for(UpdateProductService.name),
    DeleteProductService: Symbol.for(DeleteProductService.name),
  },
  repository: {
    ProductRepository: Symbol.for(ProductRepository.name),
  },
};
