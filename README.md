
I had originally created my own drag and drop application by following the DnD-kit documentation documenteation; however, it had a bunch of issues including animations not being being rendered correctly, draggable lists not being implemented at all, and an overall janky unfinished feeling. I couldnt allow myself to allow the application to be deployed to the public such a pathetic condition, so I decided to start over with help from a tutorial. 

My biggest issue was that I had overcomplicated my data structure too much, with each List owning it's Cards and forcing expensive rerenders every time a card would hover over something else, and by updating arrays within arrays. The tutorial on the other hand simplified everything by having the Lists and Cards stored in separate data structures and containing ID fields to reference each other, similar to an SQL database. This would allow us to use an array.filter() method to get all the Cards in a given List.


Drag and drop assistance provided by: https://www.youtube.com/watch?v=RG-3R6Pu_Ik&ab_channel=CodewithKliton

