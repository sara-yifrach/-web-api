using chinasA.DAL;
using chinasA.Models;
using chinasA.Models.DTO;

namespace chinasA.BLL
{
    public interface ICostumerService
    {
       public Task <List<Costumer>> GetAllAsync();
        //public Task<Costumer> GetByPassword(int password,string n);
        public Task<Costumer> Login(LoginDto loginDto);
        public Task<int> GetIdByName(string name);
        public Task <Costumer> AddCostumerAsync(Costumer CostumerToAdd);
        public Task<Costumer> UpdateCostumerAsync(Costumer CostumerToUpdate);
        public Task<Costumer> DeleteCostumerAsync(int id);


    }
}
