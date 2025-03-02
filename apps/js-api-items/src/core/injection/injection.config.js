import { Container } from "inversify";

import { TYPES } from "./injection.types";

import { ProductController, RootController } from "../../api/controller";
import { ProductRepository } from "../../api/repository";
import {
  CreateProductService,
  DeleteProductService,
  GetProductService,
  ListProductsService,
  UpdateProductService,
} from "../../api/service";

export class InjectionConfig {
  static container = new Container({ autoBindInjectable: true });

  constructor() {
    this.controllerBindings().serviceBindings().repositoryBindings();
  }

  /**
   * Injeta as dependências dos controllers.
   *
   * @returns {typeof InjectionConfig}
   */
  controllerBindings() {
    InjectionConfig.container
      .bind(TYPES.controller.RootController)
      .to(RootController);

    InjectionConfig.container
      .bind(TYPES.controller.ProductController)
      .toDynamicValue((ctx) => {
        return new ProductController(
          ctx.container.get(TYPES.service.ListProductsService),
          ctx.container.get(TYPES.service.GetProductService),
          ctx.container.get(TYPES.service.CreateProductService),
          ctx.container.get(TYPES.service.UpdateProductService),
          ctx.container.get(TYPES.service.DeleteProductService)
        );
      });

    return this;
  }

  /**
   * Injeta as dependências dos serviços.
   *
   * @returns {typeof InjectionConfig}
   */
  serviceBindings() {
    InjectionConfig.container
      .bind(TYPES.service.ListProductsService)
      .toDynamicValue((ctx) => {
        return new ListProductsService(
          ctx.container.get(TYPES.repository.ProductRepository)
        );
      });

    InjectionConfig.container
      .bind(TYPES.service.GetProductService)
      .toDynamicValue((ctx) => {
        return new GetProductService(
          ctx.container.get(TYPES.repository.ProductRepository)
        );
      });

    InjectionConfig.container
      .bind(TYPES.service.CreateProductService)
      .toDynamicValue((ctx) => {
        return new CreateProductService(
          ctx.container.get(TYPES.repository.ProductRepository)
        );
      });

    InjectionConfig.container
      .bind(TYPES.service.UpdateProductService)
      .toDynamicValue((ctx) => {
        return new UpdateProductService(
          ctx.container.get(TYPES.repository.ProductRepository)
        );
      });

    InjectionConfig.container
      .bind(TYPES.service.DeleteProductService)
      .toDynamicValue((ctx) => {
        return new DeleteProductService(
          ctx.container.get(TYPES.repository.ProductRepository)
        );
      });

    return this;
  }

  /**
   * Injeta as dependências dos repositórios.
   *
   * @returns {typeof InjectionConfig}
   */
  repositoryBindings() {
    InjectionConfig.container
      .bind(TYPES.repository.ProductRepository)
      .to(ProductRepository);

    return this;
  }
}
