using chinasA.Models;
namespace chinasA.BLL
{
    public interface IDonatorService
    {
        Task<List<Donator>> GetAllDonators();
        public Task<List<Gift>> GetAllGiftsOfDonator(int Did);
        Task<Donator> AddDonator(Donator DonatorToAdd);
        Task DeleteDonator(int id);
        Task<Donator> GetDonatorByName(string Name);
        Task<Donator> GetDonatorByEmail(string Email);
        Task<Donator> GetDonatorByGift(string giftname);

        public Task<Donator> UpdateDonator(Donator DonatorToUpdate, int id);

        //public bool IsValidEmail(string email);
    }
}
