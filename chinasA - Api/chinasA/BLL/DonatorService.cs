using chinasA.DAL;
using chinasA.Models;

namespace chinasA.BLL
{
    public class DonatorService : IDonatorService
    {
        private readonly IDonatorDal DonatorDal;
        //c-tor
        public DonatorService(IDonatorDal DonatorDal)
        {
            this.DonatorDal = DonatorDal;
        }
        //Add
        public async Task< Donator> AddDonator(Donator DonatorToAdd)
        {
           return await DonatorDal.AddDonator(DonatorToAdd);
        }
        //Remove
        public async Task DeleteDonator(int id)
        {
            await DonatorDal.DeleteDonator(id);
        }

        public async Task<List<Donator>> GetAllDonators()
        {
            return await DonatorDal.GetAllDonators();
        }

        public async Task<List<Gift>> GetAllGiftsOfDonator(int Did)
        {
            return await DonatorDal.GetAllGiftsOfDonator(Did);
        }

        public async Task<Donator> GetDonatorByEmail(string Email)
        {
            return await DonatorDal.GetDonatorByEmail(Email);
        }

        public async Task<Donator> GetDonatorByGift(string giftname)
        {
            return await DonatorDal.GetDonatorByGift(giftname);
        }

        public async Task<Donator> GetDonatorByName(string Name)
        {
            return await DonatorDal.GetDonatorByName(Name);
        }

        public async Task<Donator> UpdateDonator(Donator DonatorToUpdate,int id)
        {
            return await DonatorDal.UpdateDonator(DonatorToUpdate,id);
        }

  
        //public bool IsValidEmail(string email)
        //{
        //    return DonatorDal.IsValidEmail(email);
        //}
    }
}
