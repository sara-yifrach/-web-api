using chinasA.DAL;
using chinasA.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace chinasA.DAL
{
    public class CardDal : ICardDal
    {
        private readonly Context Context;
        public CardDal(Context context)
        {
            this.Context = context;
        }

        public async Task<Card> GetCardById(int id)
        {
            try
            {
                var Card = await Context.Cards
                    .FirstOrDefaultAsync(c => c.Id == id);
                return Card;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<Card> AddCard(Card CardToAdd)
        {
            try
            {

                var c = await Context.Gifts.Where(i => i.Id == CardToAdd.GiftId).FirstOrDefaultAsync();
                c.numOfPurchasesForT += 1;

                await Context.Cards.AddAsync(CardToAdd);
                await Context.SaveChangesAsync();
                //Purchase re = await Context.Cards.Include(i => i.Purchase).Where(u => u.Purchase.Id == CardToAdd.PurchaseId).FirstOrDefaultAsync(); 
                
                return CardToAdd;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<Card> DeleteCard(int id)
        {
            try
            {
                var Card = await Context.Cards.FirstOrDefaultAsync(d => d.Id == id);
                if (Card != null)
                {
                    Context.Cards.Remove(Card);
                    await Context.SaveChangesAsync();
                }
                return Card;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<List<Costumer>> GetCardsForGift(int giftId)
        {
            try
            {
                var cards = await Context.Cards
                    .Include(c => c.Purchase)
                    .Where(c => c.Purchase.Status == true && c.GiftId == giftId&&c.Purchase.customer!=null).Include(c=>c.Purchase.customer).Select(c=>c.Purchase.customer)
                    .ToListAsync();        
                 if(cards!=null)
                return cards;
                 return new List<Costumer> { };
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    
    }
    

}
