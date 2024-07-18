using chinasA.Models;
using chinasA.Models.DTO;

namespace chinasA.DAL

{
    public interface ICostumerDal
    {
        public Task <List<Costumer>> GetAll();
        //public Task<Costumer> GetByPassword(int password,string name);
        public Task<Costumer>Login(LoginDto loginDto);
        public Task<int> GetIdByName(string name);
        public Task<Costumer> AddCostumer(Costumer CostumerToAdd);
        public Task <Costumer> UpdateCostumer(Costumer CostumerToUpdate);
        public Task<Costumer> DeleteCostumer(int id);

    }
}
