using chinasA.Models;
using chinasA.Models.DTO;

namespace chinasA.BLL
{
    public interface IPurchaseService
    {
        public Task<List<Purchase>> GetAllPurchases();
        public Task<Purchase> AddPurchase(Purchase PurchaseToAdd);
        public Task<List<Purchase>> GetPurchasesByCostumer(int id);
        public Task<List<Card>> GetCardsOfPurchase(int Pid);
        public Task<Purchase> GetExistPurchase(int CId);
        public Task<Purchase> changeStatus(int id);



    }
}
