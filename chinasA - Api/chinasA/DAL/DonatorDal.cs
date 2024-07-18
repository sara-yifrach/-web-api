using chinasA.Models;
using chinasA.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace chinasA.DAL
{
    public class DonatorDal : IDonatorDal
    {

        private readonly Context Context;
        public DonatorDal(Context Context)
        {
            this.Context = Context;
        }

        public async Task<Donator> AddDonator(Donator DonatorToAdd)
        {
            try
            {
                //if (IsValidEmail(DonatorToAdd.Email))
                
                    await Context.Donators.AddAsync(DonatorToAdd);
                    await Context.SaveChangesAsync();
                    return DonatorToAdd;
                
                //else { return null; }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        //public bool IsValidEmail(string email)
        //{
        //    // פטרון באמצעות Regex לבדיקת כתובת דוא"ל
        //    string pattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";

        //    // בדיקה של התאמה
        //    return Regex.IsMatch(email, pattern);
        //}
        
        public async Task DeleteDonator(int id)
        {
            try
            {
                var donator = await Context.Donators.Where(d => d.Id == id).FirstOrDefaultAsync();
                if (donator != null)
                {
                    Context.Donators.Remove(donator);
                    Context.SaveChanges();
                }
               
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<Donator>> GetAllDonators()
        {
            try
            {
                return await Context.Donators.Select(Donator => Donator).ToListAsync();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public async Task<List<Gift>> GetAllGiftsOfDonator(int Did)
        {
            try
            {
                return await Context.Gifts.Where(d => d.DonatorId == Did).ToListAsync();
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        public async Task<Donator> GetDonatorByEmail(string Email)
        {
            try
            {  
                var donator = await Context.Donators
                    .FirstOrDefaultAsync(c => c.Email == Email);
                return donator;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<Donator> GetDonatorByGift(string giftname)
        {
            try
            {               
                var donor = await Context.Gifts.Where(g => g.gift == giftname).Include(g => g.Donator)
                    .Select(g => g.Donator).FirstOrDefaultAsync();              
                return donor;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<Donator> GetDonatorByName(string Name)
        {
            try
            {
                var donator = await Context.Donators
                    .FirstOrDefaultAsync(c => c.Name == Name);
                return donator;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<Donator> UpdateDonator(Donator DonatorToUpdate,int id)
        {
            try
            {
                Donator d = await Context.Donators.FirstOrDefaultAsync(c => c.Id == id);
                if (d != null)
                {
                    //d.Gifts = DonatorToUpdate.Gifts;
                    d.Name = DonatorToUpdate.Name;
                    d.Phone = DonatorToUpdate.Phone;
                    d.Address = DonatorToUpdate.Address;
                    d.Email = DonatorToUpdate.Email;
                }
                await Context.SaveChangesAsync();
                return d;
            }
            catch (Exception e)
            {
                throw e;
            }            
        }
    }
}
