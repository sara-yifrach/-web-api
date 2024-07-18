using chinasA.Models;
using chinasA.Models.DTO;

namespace chinasA.DAL
{
    public interface IDonatorDal
    {
        public Task<List<Donator>> GetAllDonators();

        public Task<List<Gift>> GetAllGiftsOfDonator(int Did);
        public Task<Donator> AddDonator(Donator DonatorToAdd);
        public Task<Donator> UpdateDonator(Donator DonatorToUpdate,int id);
        public Task DeleteDonator(int id);
        //
        public Task<Donator >GetDonatorByName(string Name);
        public Task<Donator> GetDonatorByEmail(string Email);
        public Task <Donator> GetDonatorByGift(string giftName);
        //public bool IsValidEmail(string email);

    }
}
