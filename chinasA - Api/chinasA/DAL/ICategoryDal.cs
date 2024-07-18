using chinasA.Models;

namespace chinasA.DAL
{
    public interface ICategoryDal
    {
        public Task<List<Category>> GetAllCategories();
        public Task<Category> AddCategory(Category CategoryToAdd);
        public Task<Category> UpdateCategory(Category CategoryToUpdate, int id);
        public Task<Category> DeleteCategory(int id);


    }
}
