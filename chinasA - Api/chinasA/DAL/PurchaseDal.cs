using chinasA.BLL;
using chinasA.Models;
using Microsoft.EntityFrameworkCore;

namespace chinasA.DAL
{
    public class PurchaseDal:IPurchaseDal
    {
        private readonly Context Context;
        public PurchaseDal(Context context)
        {
            this.Context = context;
        }

        public async Task<List<Purchase>> GetPurchasesByCostumer(int id)
        {
            try
            {
                var Purchases = await Context.Purchases.Where(p => p.CostumerId==id).ToListAsync();
                return Purchases;
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        public async Task<List<Purchase>> GetAllPurchases()
        {
            try
            {
                return await Context.Purchases.Select(p => p).ToListAsync();
                ;
            }
            catch (Exception e)
            {
               Console.WriteLine(e.ToString());
                throw e;
            }
        }
    
        public async Task<Purchase> AddPurchase(Purchase PurchaseToAdd)
        {
            try
            {
                await Context.Purchases.AddAsync(PurchaseToAdd);
                await Context.SaveChangesAsync();
                return PurchaseToAdd;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<Card>> GetCardsOfPurchase(int pId)
        {
            try
            {
                return await 
                    Context.Cards.Where(c => c.PurchaseId == pId).ToListAsync();
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        public async Task<Purchase> GetExistPurchase(int CId)
        {
            try
            {
               return await Context.Purchases.Where(c => c.CostumerId == CId).Where(h => h.Status == false).FirstOrDefaultAsync();
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        public async Task<Purchase> changeStatus(int id)
        {
              
                var purchase = Context.Purchases.Find(id);

                if (purchase != null)
                {
                    // Update the purchase status
                    purchase.Status = true;

                    Context.SaveChanges(); // Save changes in the database

                    // Get all the cards where the PurchaseId matches the purchaseId
                    var cards = await Context.Cards.Where(c => c.PurchaseId == id).ToListAsync();

                    if (cards.Count > 0)
                    {
                        // Update the numOfPurchasesTo for each associated gift
                        foreach (var card in cards)
                        {
                            var gift = Context.Gifts.Find(card.GiftId);
                            if (gift != null)
                            {
                                gift.numOfPurchases = gift.numOfPurchasesForT;
                            }
                        }

                       // Save changes to update numOfPurchases for gifts                      
                                       
                    }
                       
                } 
                  await Context.SaveChangesAsync();
                  return purchase;
            }
        }
              
        }
    

