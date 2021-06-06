import { CartSkuService } from './Service';
import { resetAllWhenMocks, when } from 'jest-when';
import { cartSampleData } from '../cart/Seed';
import { skuSampleData } from '../sku/Seed';
import { cartSkuSampleData } from './Seed';

const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockFindOne = jest.fn();
const mockFindByPk = jest.fn();

const mockCartSkuModel: any = {
  create: mockCreate,
  update: mockUpdate,
  findOne: mockFindOne,
  findByPk: mockFindByPk,
};

const mockSkuFindByPk = jest.fn();

const mockSkuModel: any = {
  findByPk: mockSkuFindByPk,
};

const mockCartFindByPk = jest.fn();

const mockCartModel: any = {
  findByPk: mockCartFindByPk,
};

const service = CartSkuService({
  cartModel: mockCartModel,
  skuModel: mockSkuModel,
  cartSkuModel: mockCartSkuModel,
});

afterEach(() => {
  jest.clearAllMocks();
  resetAllWhenMocks();
});

describe('Cart Sku Service', () => {
  describe('create', () => {
    it('should create a new item in cart', async () => {
      mockCartFindByPk.mockResolvedValue(cartSampleData);
      mockSkuFindByPk.mockResolvedValue(skuSampleData);
      mockFindOne.mockResolvedValue(undefined);

      when(mockCreate)
        .calledWith({ ...cartSkuSampleData, qty: 1 }, expect.anything())
        .mockReturnValue(cartSkuSampleData);

      const [created] = await service.create(cartSkuSampleData);

      expect(created).toBeDefined();
    });
    it('should not create a new item in cart, cart not found', async () => {
      mockCartFindByPk.mockResolvedValue(undefined);
      mockSkuFindByPk.mockResolvedValue(skuSampleData);
      mockFindOne.mockResolvedValue(undefined);

      const [, error] = await service.create(cartSkuSampleData);

      expect(error).toBeDefined();
    });

    it('should not create a new item in cart, product not found', async () => {
      mockCartFindByPk.mockResolvedValue(cartSampleData);
      mockSkuFindByPk.mockResolvedValue(undefined);
      mockFindOne.mockResolvedValue(undefined);

      const [, error] = await service.create(cartSkuSampleData);

      expect(error).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update an item in cart', async () => {
      mockFindByPk.mockReturnValue({
        ...cartSkuSampleData,
        sku: skuSampleData,
      });

      when(mockUpdate)
        .calledWith(cartSkuSampleData, expect.anything())
        .mockReturnValue([1, [cartSkuSampleData]]);

      const [updated] = await service.update(cartSkuSampleData);

      expect(updated).toBeDefined();
    });

    it('should not update an item in cart, item does not exist in cart', async () => {
      mockFindByPk.mockReturnValue(undefined);

      const [, error] = await service.update(cartSkuSampleData);

      expect(error).toBeDefined();
    });

    it('should not update an item in cart, no inventory', async () => {
      mockFindByPk.mockReturnValue({
        ...cartSkuSampleData,
        sku: { ...skuSampleData, inventory: 1 },
      });

      const [, error] = await service.update({ ...cartSkuSampleData, qty: 2 });

      expect(error).toBeDefined();
    });
  });
});
