using chinasA.DAL;
using chinasA.Models;
using chinasA.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace chinasA.BLL
{
  
    public class CostumerService : ICostumerService
    {
        private readonly ICostumerDal customerDal;

        public CostumerService(ICostumerDal customerDal)
        {
            this.customerDal = customerDal;
        }
        public async Task<List<Costumer>> GetAllAsync()
        {
            return await customerDal.GetAll();
        }
        public async Task<int> GetIdByName(string name)
        {
            return await customerDal.GetIdByName(name);
        }
        public async Task<Costumer> AddCostumerAsync(Costumer CostumerToAdd)
        {
            return await customerDal.AddCostumer(CostumerToAdd);
        }
        public async Task<Costumer> UpdateCostumerAsync(Costumer CostumerToUpdate)
        {
            return await customerDal.UpdateCostumer(CostumerToUpdate);
        }
        public async Task<Costumer> DeleteCostumerAsync(int id)
        {
            return await customerDal.DeleteCostumer(id);
        }

        public async Task<Costumer> Login(LoginDto loginDto)
        {
            return await customerDal.Login(loginDto);
        }

        //public async Task<Costumer> GetByPassword(int password, string n)
        //{
        //    return await customerDal.GetByPassword(password,n);
        //}

    }
}
