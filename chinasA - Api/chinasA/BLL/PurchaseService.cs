using chinasA.DAL;
using chinasA.Models;
using Microsoft.AspNetCore.Mvc;

namespace chinasA.BLL
{
    public class PurchaseService:IPurchaseService
    {
        private readonly IPurchaseDal purchaseDal;
        public PurchaseService(IPurchaseDal purchaseD)
        {
            this.purchaseDal = purchaseD;
        }
        public async Task<List<Purchase>> GetAllPurchases()
        {
            return await purchaseDal.GetAllPurchases();
        }
        public async Task<Purchase> AddPurchase(Purchase PurchaseToAdd)
        {
            return await purchaseDal.AddPurchase(PurchaseToAdd);
        }
        public async Task<List<Purchase>> GetPurchasesByCostumer(int id)
        {
            return await purchaseDal.GetPurchasesByCostumer(id);
        }

        public async Task<List<Card>> GetCardsOfPurchase(int Pid)
        {
            return await purchaseDal.GetCardsOfPurchase(Pid);
        }

        public async Task<Purchase> GetExistPurchase(int CId)
        {
            return await purchaseDal.GetExistPurchase(CId);
        }

        public async Task<Purchase> changeStatus(int id)
        {

            return await purchaseDal.changeStatus(id);
        }
    }
}
