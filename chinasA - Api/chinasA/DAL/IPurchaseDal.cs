using chinasA.Models;

namespace chinasA.DAL
{
    public interface IPurchaseDal
    {

        public Task <List<Purchase>> GetAllPurchases();
        public Task<List<Purchase>> GetPurchasesByCostumer(int id);
        public Task<List<Card>> GetCardsOfPurchase(int Pid);

        public Task<Purchase> GetExistPurchase(int CId);

        public Task <Purchase> AddPurchase(Purchase PurchaseToAdd);
        public Task<Purchase> changeStatus(int id);



    }
}
