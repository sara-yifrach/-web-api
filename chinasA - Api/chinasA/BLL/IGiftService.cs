using chinasA.Models;
using chinasA.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace chinasA.BLL
{
    public interface IGiftService
    {
        public Task<List<Gift>> GetAllGifts();
        public  Task<Gift> AddGift(Gift GiftToAdd);
        public Task<Gift> UpdateGift(int id, Gift GiftToUpdate);
        public Task DeleteGift(int id);
        //Donator GetDonatorOfGift();
        public Task<Gift> GetGiftByName(string Name);
        public Task<List<Gift>> GetGiftByNumOfCostumers(int NumOfCostumers);
        public Task<List<Gift>> GetGiftByDonator(string Donator);

        public Task<Donator> GetDonatorOfGift(GiftDto g);
        public Task<Costumer> DrawWinner(int giftId);
        public Task<Costumer> DrawWinnerName(Winner w);


    }
}
