using chinasA.Models;
using chinasA.Models.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Drawing;
using System.Linq;

namespace chinasA.DAL
{
    public class CostumerDal : ICostumerDal
    {
        
        private readonly Context context;
        public CostumerDal(Context Context)
        {
            this.context = Context;
        }

        public async Task<List<Costumer>> GetAll()
        {
            try
            {
                return await context.Costumers.Select(Costumer => Costumer).ToListAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<int> GetIdByName(string name)
        {
            try
            {
                Costumer c = await context.Costumers.FirstAsync(Costumer => Costumer.Name==name);
                return c.Id;
            }
            catch (Exception ex)
            {
                throw;
            }
        }




        public async Task<Costumer> AddCostumer(Costumer CostumerToAdd)
        {
            await context.Costumers.AddAsync(CostumerToAdd);
            await context.SaveChangesAsync();
            return CostumerToAdd;
        }


        public async Task<Costumer> UpdateCostumer(Costumer CostumerToUpdate)
        {
            try
            {
                Costumer c = await context.Costumers.FirstOrDefaultAsync(c => c.Name == CostumerToUpdate.Name);
                if (c != null)
                {
                    c.Name = CostumerToUpdate.Name;
                    c.Password = CostumerToUpdate.Password;
                    c.PaymentMethod = CostumerToUpdate.PaymentMethod;
                    c.Phone = CostumerToUpdate.Phone;
                    //c.Purchases = CostumerToUpdate.Purchases;
                    c.Address = CostumerToUpdate.Address;
                    c.Email = CostumerToUpdate.Email;
                }
                await context.SaveChangesAsync();
                return c;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //public async Task<Costumer> GetByPassword(int password, string name)
        //{
        //    try
        //    {
        //        Costumer res = await context.Costumers.Select(Costumer => Costumer).Where(H => H.Password == password && H.Name == name).FirstOrDefaultAsync();
        //        if (res != null)
        //        {
        //            return res;
        //        }
        //        return null;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
        //}
        public async Task<Costumer> Login(LoginDto loginDto)
        {
            try
            {

                Costumer user = await context.Costumers.FirstOrDefaultAsync((c => c.Name.ToLower() == loginDto.Name.ToLower() && c.Password == loginDto.Password));
                //if (user == null)
                //{
                //    user = await context.Costumers.FirstOrDefaultAsync((c => c.Name.ToLower() == loginDto.Name.ToLower() && c.Password == loginDto.Password));
                //}
                if (user != null)

                    return user;
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Costumer> DeleteCostumer(int id)
        {
            Costumer costumer = await context.Costumers.FirstOrDefaultAsync(x => x.Id == id);
            context.Costumers.Remove(costumer);
            context.SaveChangesAsync();
            return costumer;
        }
    }
}
