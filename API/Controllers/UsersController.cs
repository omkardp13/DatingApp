using API.Database;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [Authorize]
    public class UsersController : BaseAPIController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users =await _context.Users.ToListAsync();
            return users;
        }

        /*
         * imagine,this request was testy burger that you then give to waiter who then takes order to kitchen so chef can make your burger,now in a synchronous world,the waiter would then hang around the kitchen waiting for the tatsty burger 
            now imagine,if you will ,that this request to go and get this single user and the restaurant analogy and just imagine ,this request for tasty burger that give to a waiter who then takes order to kitchen  
now in synchronous world ,the waiter would take the hang around the kitchen waiting for tasy burger to be coocked by chef in the mean time there could be other requeat coming in your seever or in restaurant anology ,but if yoy're only waiter or if that was the only way to ,he's waiting for the burger to be coocked he cannot take any orders
in web world every server is multithreaded and can be handled maybe hundreds of synchronous requests at any one time 
now in the real world of couser ,in a restaurant ,a waiter will take your order it will take to the kitchen and then he'll come back and take other orders and when the order is ready ,then a bell ring or something and a waiter will go back to the kitchen pick the  order adn dekiver it to the table but it mean time he can handle other request from other dinners

if we make this asynchronous ,sure,we make our requests to the database but then that gets passed on a diffrent threads known as a delegate and the mean time ,that thread can get on the business of handling other requests ,maybe to get the databse and get other quesries or whatever it needs to be beacuse we have request coming in web server but isn't blocked whilst it's waiting for the databse to return 


task at a task represetns an asynchronous operation that can return a value 
we need to use await operator to tell this method that we're going to wait for it and it will notify us when it;s been completed.




         * 
         * 
         */



        [HttpGet("{id}")]  //api/users/2
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }




    }
}
