using AutoMapper;
using chinasA.BLL;
using chinasA.Models;
using chinasA.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace chinasA.DAL
{
    public class GiftDal : IGiftDal
    {

        private readonly Context Context;
        public GiftDal(Context Context)
        {
            this.Context = Context;
        }
         async Task<Gift> IGiftDal.AddGift(Gift GiftToAdd)
        {
            try
            {
                 await Context.Gifts.AddAsync(GiftToAdd);
                 await Context.SaveChangesAsync();
                return GiftToAdd;
            }
            catch (Exception ex)
            {
                throw;
            };
        }

         async Task IGiftDal.DeleteGift(int id)
        {
            try
            {

                var res = await Context.Gifts.FirstOrDefaultAsync(g => g.Id == id);
                Context.Gifts.Remove(res);
                Context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

         async Task<List<Gift> >IGiftDal.GetAllGifts()
        {
            try
            {
                return await Context.Gifts.Select(Gift => Gift).ToListAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

          public async Task<List<Gift>> GetGiftByDonator(string Donator)
        {
            try
            {
                var gift1 = await Context.Gifts.Include(g => g.Donator)
                    .Where(d => d.Donator.Name == Donator)
                .Select(g => g).ToListAsync();

               if(gift1!=null) return gift1;return null;
            }
            catch (Exception e)
            {
                throw;
            };
        }

         async Task<Gift> IGiftDal.GetGiftByName(string Name)
        {
            try
            {
                var gift = await Context.Gifts
                    .FirstOrDefaultAsync(c => c.gift == Name);
                return gift;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

         async Task<List<Gift>> IGiftDal.GetGiftByNumOfCostumers(int NumOfCostumers)
        {
            throw new NotImplementedException();
        }

          async Task<Gift> IGiftDal.UpdateGift(int id,Gift GiftToUpdate)
        {
            try
            {
                //Gift gift = mapper.Map<Gift>(GiftToAdd);
                Gift g = await Context.Gifts.FirstOrDefaultAsync(c => c.Id ==id);
                if (g != null)
                {
                    g.Id = id;
                    g.gift = GiftToUpdate.gift;
                    g.DonatorId = GiftToUpdate.DonatorId;
                    g.CategoryId = GiftToUpdate.CategoryId;
                    g.ImageFile = GiftToUpdate.ImageFile;
                    g.numOfPurchases = GiftToUpdate.numOfPurchases;
                    g.price = GiftToUpdate.price;
                }

                await Context.SaveChangesAsync();
                return g;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<Donator> GetDonatorOfGift(GiftDto g)
        {
            try
            {
                var donator = await Context.Gifts.Where(g2=>g2.Equals(g))
                    .Include(g3=>g3.Donator).Select(g4=>g4.Donator).FirstOrDefaultAsync();
                return donator;
            }
            catch(Exception e)
            {
                throw;    
            }
        }

        public async Task<Costumer> DrawWinnerName(Winner w)
        {
            
            var res = await Context.Costumers.FirstOrDefaultAsync(i => i.Id == w.CostumerId);
            return res;
           
        }

        public async Task<Costumer> DrawWinner(int giftId)
        {
            var res = await Context.Gifts.FirstOrDefaultAsync(i => i.Id == giftId);
            if (res.numOfPurchases == 0) { return null; }
            else
            {
                Random random = new Random();
                var cards = await Context.Cards
                        .Include(c => c.Purchase)
                        .Where(c => c.Purchase.Status == true && c.GiftId == giftId && c.Purchase.customer != null).Include(c => c.Purchase.customer).Select(c => c.Purchase.customer)
                        .ToListAsync();
                //List<Costumer> lc = await cardDal.GetCardsForGift(giftid);
                int randomIndex = random.Next(cards.Count);
                Costumer randomCostumer = cards[randomIndex];
                //return new Winner
                //{
                //    CostumerId = randomCostumer.Id,
                //    GiftId = giftId
                //};

                res.WinnerId = randomCostumer.Id;
                Context.SaveChangesAsync();
                return randomCostumer;
            }
            
        }
    }
}
