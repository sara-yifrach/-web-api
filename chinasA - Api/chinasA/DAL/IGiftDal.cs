using chinasA.Models;
using chinasA.Models.DTO;

namespace chinasA.DAL
{
    public interface IGiftDal
    {
         Task< List<Gift>> GetAllGifts();
         Task< Gift> AddGift(Gift GiftToAdd);      
         Task DeleteGift(int id);
         Task<Gift> GetGiftByName(string Name);
         Task<List<Gift>> GetGiftByNumOfCostumers(int NumOfCostumers);
         Task<List<Gift>> GetGiftByDonator(string Donator);
         Task<Donator> GetDonatorOfGift(GiftDto g);
         Task<Gift> UpdateGift(int id, Gift GiftToUpdate);
        public Task<Costumer> DrawWinnerName(Winner w);
        public Task<Costumer> DrawWinner(int giftId);


    }

}