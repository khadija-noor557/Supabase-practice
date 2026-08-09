const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co"
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8"


const { createClient } = supabase
const client = createClient(supabaseUrl, supabaseKey)

console.log(client);

// collecting data

let submit = document.querySelector("#submitBtn")

let studentNames = document.querySelector("#stu")
let course = document.querySelector("#cou")
let email = document.querySelector("#email")


submit.addEventListener("click", async (event) => {


    try {
        event.preventDefault()

        if (!studentNames.value || !course.value || !email.value) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "fill your data",

            });
            return
        }

        const { error } = await client
            .from('students_data')
            .insert([{
                name: studentNames.value,
                course: course.value,
                email_address: email.value,

            }])

        Swal.fire({
            title: "student added succuccesfully !",
            icon: "success",
            draggable: true
        });
        console.log(error)
    }
    catch (error) {
        console.log(error)
    }

    studentNames.value = "";
    course.value = "";
    email.value = "";
})

// getAlldata

const getAllData = async()=>{
   try{
     const { data, error } = await client
  .from('students_data')
  .select()
  console.log(data);
  console.log(error);
   }
   catch(error){
    console.log(error);
   }
}

getAllData();

// getOne

const getOne = async()=>{
   try{
     const { data, error } = await client
  .from('students_data')
  .select().eq("name","khadija")
  console.log(data);
  console.log(error);
   }
   catch(error){
    console.log(error);
   }
} 
getOne()

// justName

const justName = async()=>{
   try{
     const { data, error } = await client
  .from('students_data')
  .select("name")
  console.log(data);
  console.log(error);
   }
   catch(error){
    console.log(error);
   }
} 

justName()