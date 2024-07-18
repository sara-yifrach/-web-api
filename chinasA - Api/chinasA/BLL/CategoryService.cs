using chinasA.DAL;
using chinasA.Models;

namespace chinasA.BLL
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryDal categoryDal;
        public CategoryService(ICategoryDal categoryDal) 
        { 
           this.categoryDal = categoryDal;
        }
        public async Task<Category> AddCategory(Category CategoryToAdd)
        {
            return await categoryDal.AddCategory(CategoryToAdd);
        }

        public async Task<Category> DeleteCategory(int id)
        {
            return await categoryDal.DeleteCategory(id);
;       }

        public async Task<List<Category>> GetAllCategories()
        {
            return await categoryDal.GetAllCategories();
        }

        public async Task<Category> UpdateCategory(Category CategoryToUpdate, int id)
        {
            return await categoryDal.UpdateCategory(CategoryToUpdate, id);
        }
    }
}
