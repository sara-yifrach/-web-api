using chinasA.DAL;
using chinasA.Models;
using chinasA.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace chinasA.BLL
{
    public class GiftService : IGiftService
    {

        private readonly IGiftDal giftDal;
        private readonly ICardDal cardDal;

        //c-tor
        public GiftService(IGiftDal giftDal)
        {
            this.giftDal = giftDal;
            this.cardDal = cardDal;
        }
        public async Task<Gift> AddGift(Gift GiftToAdd)
        {
            return await giftDal.AddGift(GiftToAdd);
        }

        public async Task DeleteGift(int id)
        {

            await giftDal.DeleteGift(id);
        }

        public async Task<List<Gift>> GetAllGifts()
        {
            return await giftDal.GetAllGifts();
        }

        public async Task<Donator> GetDonatorOfGift(GiftDto g)
        {
            return await giftDal.GetDonatorOfGift(g);
        }

        public Task<List<Gift>> GetGiftByDonator(string Donator)
        {
            return giftDal.GetGiftByDonator(Donator);
        }

        public async Task<Gift> GetGiftByName(string Name)
        {
            return await giftDal.GetGiftByName(Name);
        }

        public async Task<List<Gift>> GetGiftByNumOfCostumers(int NumOfCostumers)
        {
            return await giftDal.GetGiftByNumOfCostumers(NumOfCostumers);
        }

        public async Task<Gift> UpdateGift(int id, Gift GiftToUpdate)
        {
            return await giftDal.UpdateGift(id, GiftToUpdate);
        }
        //public async Task<Winner> DrawWinner(List<Costumer>)
        //{
        //Random random = new Random();
        //List<Costumer> lc = await cardDal.GetCardsForGift(giftid);
        //int randomIndex = random.Next(lc.Count);
        //Costumer randomCostumer = lc[randomIndex];
        //    return new Winner { CostumerId = randomCostumer.Id, GiftId = giftid


        public async Task<Costumer> DrawWinnerName(Winner w)
        {
            return await giftDal.DrawWinnerName(w);
        }

        public async Task<Costumer> DrawWinner(int giftId)
        {
            return await giftDal.DrawWinner(giftId);
        }
    }
}
