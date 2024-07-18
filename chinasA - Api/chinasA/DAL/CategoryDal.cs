using chinasA.DAL;
using chinasA.Models;
using Microsoft.EntityFrameworkCore;

namespace chinasA.DAL
{
    public class CategoryDal : ICategoryDal
    {
        private readonly Context Context;
        public CategoryDal(Context context)
        {
            this.Context = context;
        }
        public async Task<List<Category>> GetAllCategories()
        {
            try
            {
                var categories = await Context.Categorys.Select(category => category).ToListAsync();
                return categories;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<Category> AddCategory(Category category)
        {
            try
            {
                await Context.Categorys.AddAsync(category);
                await Context.SaveChangesAsync();
                return category;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<Category> DeleteCategory(int id)
        {
            try
            {
                var category = await Context.Categorys.FirstOrDefaultAsync(d => d.Id == id);
                if (category != null)
                {
                    Context.Categorys.Remove(category);
                    await Context.SaveChangesAsync();
                }
                return category;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<Category> UpdateCategory(Category Category, int CategoryId)
        {
            try
            {
                Category c = await Context.Categorys.FirstOrDefaultAsync(c => c.Id == CategoryId);
                if (c != null)
                {
                    c.Name = Category.Name;
                }

                await Context.SaveChangesAsync();
                return Category;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}

