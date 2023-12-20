<form
                 onSubmit={handleSubmit}
                 autoComplete="off"
                 className="w-full" >
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class=" relative w-full items-center ">

                        <input
                         name="search-field"
                         autoComplete="off"
                         id="search-field"
                         type="search"
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         class="   w-2/5   p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Employee name, employee id..." required />
                        <CiSearch type="submit" size={20} class=" absolute start-2.5 top-2.5 text-black cursor-pointer" />
                    </div>
                </form>




const handleSubmit = async (e) => {
    e.preventDefault();
   
    //chuyển sang trang chứa kết quả search
   searchFunc();

  };